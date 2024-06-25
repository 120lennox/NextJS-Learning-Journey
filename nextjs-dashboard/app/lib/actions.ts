'use server';


export async function createInvoice(formData: FormData) {
    //extracting data from form data
    const rawFormData = {
        customerID: formData.get('customerID'),
        amount: formData.get('amount'),
        status: formData.get('status')
    } 

    console.log(rawFormData)
}