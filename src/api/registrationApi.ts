import { projectKey, getApiRoot } from '../commercetoolsConfig'

export const registerCustomer = async (email: string, password: string): Promise<void> => {
    const apiRoot = getApiRoot();

    const customerDraft: any = {
        email: email,
        password: password,
    };

    try {
        const response = await apiRoot.withProjectKey({ projectKey }).customers()
            .post(customerDraft)
            .execute();

        if (response.statusCode === 201) {
            console.log('Customer registered successfully!');
        } else {
            console.error('Registration failed.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};
