package com.mycompany.blog.repository;

import com.mycompany.blog.domain.Layout;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Layout entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LayoutRepository extends JpaRepository<Layout, Long> {}
