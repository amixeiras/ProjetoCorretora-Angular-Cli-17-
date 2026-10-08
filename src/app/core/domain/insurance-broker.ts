export interface InsuranceProduct {
  icon: string;
  iconId?: number;
  name: string;
  description: string;
}

export interface BrokerBrand {
  id: number;
  slug: string;
  name: string;
  logoUrl: string;
  tagline: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  phone: string;
  email: string;
  primaryColor: string;
  secondaryColor: string;
  products: InsuranceProduct[];
}