'use server';

import {z} from 'zod'  //libray for validating typescript datatypes
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
    id: z.string(),
    customerID: z.string(),
    amount: z.coerce.string(), // coerce means it will change say from number to string during data transfer
    status: z.enum(['pending', 'paid']),
    date: z.string()
})

const CreateInvoice = FormSchema.omit({ id: true, date: true });


export async function createInvoice(formData: FormData) {
    const {customerID, amount, status} = FormSchema.parse({
        //extracting data from form data
        customerID: formData.get('customerID'),
        amount: formData.get('amount'),
        status: formData.get('status')
    })

    //storing monetary values in cents. 
    const amountInCents = Math.round(parseFloat(amount) * 100)

    //creating new date
    const date = new Date().toISOString().split('T')[0];

    //entering the records into the database
    await sql 
                `INSERT INTO invoices (customer_id, amount, status, date)
                VALUES (${customerID}, ${amountInCents}, ${status}, ${date})`
  
}