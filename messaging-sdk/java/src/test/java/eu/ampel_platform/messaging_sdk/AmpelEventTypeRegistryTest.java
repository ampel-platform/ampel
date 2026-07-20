package eu.ampel_platform.messaging_sdk;

import com.google.protobuf.Message;
import com.google.protobuf.Parser;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
final class AmpelEventTypeRegistryTest {

    @Mock
    private Parser<? extends Message> mockedParser;

    @Test
    public void shouldSucceed_TryGettingParserForUnknownButValidTypeUrl()
            throws InvalidTypeUrlException {
        var typeRegistry = AmpelEventTypeRegistry.withParsersForEventTypeUrls(new HashMap<>());

        var parser = typeRegistry.getParserForTypeUrl("some.prefix/my.actual.type.in.protobuf.world");

        assertTrue(parser.isEmpty());
    }

    @Test
    public void shouldSucceed_TryGettingParserForActuallyRegisteredTypeUrl()
            throws InvalidTypeUrlException {

        var prefixlessTypeUrl = "my.test.type";
        var fullTypeUrl = "some.prefix/" + prefixlessTypeUrl;
        var typeRegistry = AmpelEventTypeRegistry.withParsersForEventTypeUrls(
                Map.of(prefixlessTypeUrl, mockedParser));

        var parser = typeRegistry.getParserForTypeUrl(fullTypeUrl);

        assertTrue(parser.isPresent());
        assertEquals(mockedParser, parser.get());
    }

    @Test
    public void shouldThrow_TryGettingParserForInvalidTypeUrl() {
        var typeRegistry = AmpelEventTypeRegistry.withParsersForEventTypeUrls(new HashMap<>());

        assertThrows(InvalidTypeUrlException.class, () -> typeRegistry.getParserForTypeUrl("invalid-url"));
    }
}
