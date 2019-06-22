package furniture.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import furniture.app.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	   User findByUsername(String username);
}
