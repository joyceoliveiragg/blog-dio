package com.mycompany.blog.domain;

import static com.mycompany.blog.domain.LayoutTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.blog.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LayoutTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Layout.class);
        Layout layout1 = getLayoutSample1();
        Layout layout2 = new Layout();
        assertThat(layout1).isNotEqualTo(layout2);

        layout2.setId(layout1.getId());
        assertThat(layout1).isEqualTo(layout2);

        layout2 = getLayoutSample2();
        assertThat(layout1).isNotEqualTo(layout2);
    }

    @Test
    void hashCodeVerifier() {
        Layout layout = new Layout();
        assertThat(layout.hashCode()).isZero();

        Layout layout1 = getLayoutSample1();
        layout.setId(layout1.getId());
        assertThat(layout).hasSameHashCodeAs(layout1);
    }
}
