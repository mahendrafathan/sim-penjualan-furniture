package furniture.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import furniture.app.model.Role;


public interface RoleRepository extends JpaRepository<Role, Long> {

}
