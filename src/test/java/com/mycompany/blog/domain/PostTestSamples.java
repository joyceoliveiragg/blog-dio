package com.mycompany.blog.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class PostTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Post getPostSample1() {
        return new Post()
            .id(1L)
            .title("title1")
            .description("description1")
            .imageUrl("imageUrl1")
            .authorName("authorName1")
            .category("category1");
    }

    public static Post getPostSample2() {
        return new Post()
            .id(2L)
            .title("title2")
            .description("description2")
            .imageUrl("imageUrl2")
            .authorName("authorName2")
            .category("category2");
    }

    public static Post getPostRandomSampleGenerator() {
        return new Post()
            .id(longCount.incrementAndGet())
            .title(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .imageUrl(UUID.randomUUID().toString())
            .authorName(UUID.randomUUID().toString())
            .category(UUID.randomUUID().toString());
    }
}
