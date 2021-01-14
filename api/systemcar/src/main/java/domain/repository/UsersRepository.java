package domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import domain.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Integer> {

    Optional<Users> findByLogin(String login);
    
    @Query(value = "select * from TB_USERS u where u.firstName like '%:firstName%' ", nativeQuery = true)
    List<Users> encontrarPorNome( @Param("firstName") String firstName );

    @Query("delete from TB_USERS u where u.id =:id ")
    @Modifying
    void deleteById(Long id);

    boolean existsByNome(String firstName);

    
}
