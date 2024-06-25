'use server';

import {z} from 'zod'  //libray for validating typescript datatypes
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    customerID: z.string().nullable(),
    amount: z.coerce.string(), // coerce means it will change say from number to string during data transfer
    status: z.enum(['pending', 'paid']),
    date: z.string()
})

const CreateInvoice = FormSchema.omit({ id: true, date: true });


export async function createInvoice(formData: FormData) {
    //adding error handling technique. trying to solve customerID null error

    try{
        const {customerID, amount, status} = CreateInvoice.parse({
            //extracting data from form data
    
            customerID: formData.get('customerID'),
            amount: formData.get('amount'),
            status: formData.get('status')
        })

        if(!customerID){
            throw new Error('Customer ID is required');
        }

    //storing monetary values in cents. 
    const amountInCents = Math.round(parseFloat(amount) * 100)

    //creating new date
    const date = new Date().toISOString().split('T')[0];

    //entering the records into the database
    await sql 
                `INSERT INTO invoices (customer_id, amount, status, date)
                 VALUES (${customerID}, ${amountInCents}, ${status}, ${date})`
    }catch(error){
        //error handling
        console.error('failed to create an invoice', error)
    }

    // revalidating path
    revalidatePath('/dashboard/invoices');

    //redirection
    redirect('/dashboard/invoices');
}