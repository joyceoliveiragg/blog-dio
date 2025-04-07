package com.mycompany.blog.web.rest;

import com.mycompany.blog.domain.Layout;
import com.mycompany.blog.repository.LayoutRepository;
import com.mycompany.blog.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.blog.domain.Layout}.
 */
@RestController
@RequestMapping("/api/layouts")
@Transactional
public class LayoutResource {

    private static final Logger LOG = LoggerFactory.getLogger(LayoutResource.class);

    private static final String ENTITY_NAME = "layout";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LayoutRepository layoutRepository;

    public LayoutResource(LayoutRepository layoutRepository) {
        this.layoutRepository = layoutRepository;
    }

    /**
     * {@code POST  /layouts} : Create a new layout.
     *
     * @param layout the layout to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new layout, or with status {@code 400 (Bad Request)} if the layout has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Layout> createLayout(@RequestBody Layout layout) throws URISyntaxException {
        LOG.debug("REST request to save Layout : {}", layout);
        if (layout.getId() != null) {
            throw new BadRequestAlertException("A new layout cannot already have an ID", ENTITY_NAME, "idexists");
        }
        layout = layoutRepository.save(layout);
        return ResponseEntity.created(new URI("/api/layouts/" + layout.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, layout.getId().toString()))
            .body(layout);
    }

    /**
     * {@code GET  /layouts} : get all the layouts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of layouts in body.
     */
    @GetMapping("")
    public List<Layout> getAllLayouts() {
        LOG.debug("REST request to get all Layouts");
        return layoutRepository.findAll();
    }

    /**
     * {@code GET  /layouts/:id} : get the "id" layout.
     *
     * @param id the id of the layout to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the layout, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Layout> getLayout(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Layout : {}", id);
        Optional<Layout> layout = layoutRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(layout);
    }

    /**
     * {@code DELETE  /layouts/:id} : delete the "id" layout.
     *
     * @param id the id of the layout to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLayout(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Layout : {}", id);
        layoutRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
