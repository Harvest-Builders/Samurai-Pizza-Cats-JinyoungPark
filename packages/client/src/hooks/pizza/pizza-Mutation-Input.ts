export interface onCreateInput {
  id: string;
  name: string;
  description: string;
  imgSrc: string;
  toppingIds: string[];
}

export interface onDeleteInput {
  id?: string;
}

export interface onUpdateInput {
  id: string;
  name?: string;
  description?: string;
  toppingIds?: string[];
  imgSrc?: string;
}
