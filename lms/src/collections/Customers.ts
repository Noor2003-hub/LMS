import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'name',
  },
  access:{
    create:()=>true,
    
  }, 
  auth: true,
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required:true
  }
    // Email added by default
    // Add more fields as needed
  ],
}
