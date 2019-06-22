package furniture.app.service;

import furniture.app.model.User;

public interface UserService {
	void save(User user);
	
	User findByUsername(String username);

}
