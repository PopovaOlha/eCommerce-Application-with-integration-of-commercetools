import { projectKey, getApiRoot } from '../commercetoolsConfig'

export const registerCustomer = async (email: string, password: string): Promise<void> => { 

    const customerDraft: any = { 
     email: email,
     password: password,
    };

    try {
        const response = await getApiRoot().withProjectKey({ projectKey }).customers()
            .post(customerDraft).execute().then(response => console.log(response))
    } catch {
        console.error('error',);
    }
    
}
