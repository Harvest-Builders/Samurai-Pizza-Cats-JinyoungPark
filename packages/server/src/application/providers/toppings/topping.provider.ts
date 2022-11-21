import { ObjectId, Collection } from 'mongodb';
import { ToppingDocument, toToppingObject } from '../../../entities/topping';
import { CreateToppingInput, Topping, UpdateToppingInput } from './topping.provider.types';
import validateStringInputs from '../../../lib/string-validator';

class ToppingProvider {
  constructor(private collection: Collection<ToppingDocument>) {}

  public async getToppings(): Promise<Topping[]> {
    const toppings = await this.collection.find().sort({ name: 1 }).toArray();
    return toppings.map(toToppingObject);
  }

  public async createTopping(input: CreateToppingInput): Promise<Topping> {
    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      { $set: { ...input, updatedAt: new Date().toISOString(), createdAt: new Date().toISOString() } },
      { upsert: true, returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not create the ${input.name} topping`);
    }
    const topping = data.value;

    return toToppingObject(topping);
  }

  public async deleteTopping(id: string): Promise<string> {
    const toppingId = new ObjectId(id);

    const toppingData = await this.collection.findOneAndDelete({
      _id: toppingId,
    });

    const topping = toppingData.value;

    if (!topping) {
      throw new Error(`Could not delete the topping`);
    }

    return id;
  }

  public async updateTopping(input: UpdateToppingInput): Promise<Topping> {
    const { id, name, priceCents } = input;

    if (name) validateStringInputs(name);

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...(name && { name: name }), ...(priceCents && { priceCents: priceCents }) } },
      { returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not update the topping`);
    }
    const topping = data.value;

    return toToppingObject(topping);
  }

  public async getToppingsByIds(toppingIds: string[]): Promise<Topping[]> {
    const toppings = await this.collection
      .find({ _id: { $in: toppingIds } })
      .sort({ name: 1 })
      .toArray();
    return toppings.map(toToppingObject);
  }

  public async validateToppings(toppingIds: string[]): Promise<void> {
    for (var i = 0; i < toppingIds.length; i++) {
      const element = new ObjectId(toppingIds[i]);
      const toppingCount = await this.collection.countDocuments({ _id: element });
      if (toppingCount < 1) {
        throw new Error(`Could not find the topping of ID:${element}`);
      }
    }
  }

  public async getPriceCents(toppingIds: string[]): Promise<number> {
    const toppings = await this.collection.find({ _id: { $in: toppingIds } }).toArray();

    const sumPriceCents = toppings
      .map((topping) => {
        return topping.priceCents;
      })
      .reduce((prev, cur) => prev + cur, 0);

    return sumPriceCents;
  }
}

export { ToppingProvider };
