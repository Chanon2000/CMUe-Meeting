import { AuthModel } from "./auth.model";

export class UserModel extends AuthModel {
	id?: number;
	first_name?: string;
	last_name?: string;
	identity_code?: string;
	phone?: string;
	address?: string;
	email?: string;
	gender?: string;
	age?: string;
	work?: string;
	facebook?: string;
	drug_history?: string;
	skin_problem?: string;


	setUser(user: any) {
		this.id = user.id;
		this.first_name = user.first_name || '';
		this.last_name = user.last_name || '';
		this.identity_code = user.identity_code || '';
		this.phone = user.phone || '';
		this.address = user.address || '';
		this.email = user.email || '';
		this.gender = user.gender || '';
		this.age = user.age || '';
		this.work = user.work || '';
		this.facebook = user.facebook || '';
		this.drug_history = user.drug_history || '';
		this.skin_problem = user.skin_problem || '';
	}
}