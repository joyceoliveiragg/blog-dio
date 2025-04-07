package com.mycompany.blog.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class LayoutTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Layout getLayoutSample1() {
        return new Layout().id(1L);
    }

    public static Layout getLayoutSample2() {
        return new Layout().id(2L);
    }

    public static Layout getLayoutRandomSampleGenerator() {
        return new Layout().id(longCount.incrementAndGet());
    }
}
