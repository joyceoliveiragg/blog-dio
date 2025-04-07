package com.mycompany.blog.web.rest;

import static com.mycompany.blog.domain.LayoutAsserts.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.blog.IntegrationTest;
import com.mycompany.blog.domain.Layout;
import com.mycompany.blog.repository.LayoutRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link LayoutResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LayoutResourceIT {

    private static final String ENTITY_API_URL = "/api/layouts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private LayoutRepository layoutRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLayoutMockMvc;

    private Layout layout;

    private Layout insertedLayout;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Layout createEntity() {
        return new Layout();
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Layout createUpdatedEntity() {
        return new Layout();
    }

    @BeforeEach
    void initTest() {
        layout = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedLayout != null) {
            layoutRepository.delete(insertedLayout);
            insertedLayout = null;
        }
    }

    @Test
    @Transactional
    void createLayout() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Layout
        var returnedLayout = om.readValue(
            restLayoutMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(layout)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Layout.class
        );

        // Validate the Layout in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertLayoutUpdatableFieldsEquals(returnedLayout, getPersistedLayout(returnedLayout));

        insertedLayout = returnedLayout;
    }

    @Test
    @Transactional
    void createLayoutWithExistingId() throws Exception {
        // Create the Layout with an existing ID
        layout.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLayoutMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(layout)))
            .andExpect(status().isBadRequest());

        // Validate the Layout in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLayouts() throws Exception {
        // Initialize the database
        insertedLayout = layoutRepository.saveAndFlush(layout);

        // Get all the layoutList
        restLayoutMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(layout.getId().intValue())));
    }

    @Test
    @Transactional
    void getLayout() throws Exception {
        // Initialize the database
        insertedLayout = layoutRepository.saveAndFlush(layout);

        // Get the layout
        restLayoutMockMvc
            .perform(get(ENTITY_API_URL_ID, layout.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(layout.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingLayout() throws Exception {
        // Get the layout
        restLayoutMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void deleteLayout() throws Exception {
        // Initialize the database
        insertedLayout = layoutRepository.saveAndFlush(layout);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the layout
        restLayoutMockMvc
            .perform(delete(ENTITY_API_URL_ID, layout.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return layoutRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Layout getPersistedLayout(Layout layout) {
        return layoutRepository.findById(layout.getId()).orElseThrow();
    }

    protected void assertPersistedLayoutToMatchAllProperties(Layout expectedLayout) {
        assertLayoutAllPropertiesEquals(expectedLayout, getPersistedLayout(expectedLayout));
    }

    protected void assertPersistedLayoutToMatchUpdatableProperties(Layout expectedLayout) {
        assertLayoutAllUpdatablePropertiesEquals(expectedLayout, getPersistedLayout(expectedLayout));
    }
}
