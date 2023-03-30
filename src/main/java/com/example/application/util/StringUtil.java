package com.example.application.util;

import java.util.Arrays;
import java.util.stream.Collectors;

public final class StringUtil {

    private StringUtil() {
        // do not instantiate
    }


    public static String constToTitleCase(String value) {
        return Arrays.stream(value.split("_"))
                .map(word -> word.charAt(0) + word.substring(1).toLowerCase())
                .collect(Collectors.joining(" "));
    }
}
