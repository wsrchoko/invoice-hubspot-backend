export interface Invoice {
  logo?: string;
  no?: string;
  date?: Date;
  dueDate?: Date;
  subtotal?: number;
  tax?: number;
  discount?: number;
  total?: number;
  notes?: string;
  yourCompany: YourCompany;
  clientCompany?: ClientCompany;
}

export interface YourCompany {
  company: string;
  fullName: string;
  website: string;
  address?: string;
  city?: string;
  country?: string;
  phone: number;
  email: string;
}

export interface ClientCompany {
  company?: string;
  fullName?: string;
  address?: string;
  city?: string;
  country?: string;
}
