package eu.ampel_platform;

import java.io.IOException;

public final class ResourceUtility {

    private ResourceUtility() {
    }

    public static byte[] getResourceAsBytes(String resourcePath) throws IOException {
        try (var resourceStream = ResourceUtility.class.getClassLoader().getResourceAsStream(resourcePath)) {
            if (resourceStream == null) {
                throw new IOException("Resource not found: " + resourcePath);
            }

            return resourceStream.readAllBytes();
        }
    }
}
