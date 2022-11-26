export interface Pizza {
  id: string;
  name: string;
  description: string;
  toppingIds: string[];
  imgSrc: string;
}

export interface onCreateInput {
  name: string;
  description?: string;
  imgSrc?: string;
  toppings?: string[];
}

export interface onDeleteInput {
  id?: string | null;
}

export interface onUpdateInput {
  id: string;
  name?: string | null;
  description?: string | null;
  toppingIds?: string[] | null;
  imgSrc?: string | null;
}
