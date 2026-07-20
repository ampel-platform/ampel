package eu.ampel_platform.messaging_sdk;

import com.google.protobuf.Message;
import eu.ampel_platform.messaging_sdk.generated.events.influx.AmpelPatientDiedEvent;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
final class AmpelEventHandlerRouterTest {

    @Mock
    private Consumer<Message> defaultEventHandler;

    @Test
    public void shouldSucceed_CallingFallbackHandlerOnUnknownEvent() {
        var router = AmpelEventHandlerRouter.newBuilder(defaultEventHandler)
                .build();

        var unknownMessage = Mockito.spy(Message.class);
        router.routeEvent(unknownMessage);

        Mockito.verify(defaultEventHandler, Mockito.times(1)).accept(unknownMessage);
    }

    @Test
    public void shouldSucceed_CallingAppropriateRegisteredEventHandler() throws InterruptedException {
        var latch = new CountDownLatch(1);
        var patientDiedEventHandler = new AmpelEventHandler<AmpelPatientDiedEvent>() {
            @Override
            public void handleEvent(AmpelPatientDiedEvent event) {
                latch.countDown();
            }

            @Override
            public Class<AmpelPatientDiedEvent> getHandledEventType() {
                return AmpelPatientDiedEvent.class;
            }
        };

        var router = AmpelEventHandlerRouter.newBuilder(defaultEventHandler)
                .withEventHandler(patientDiedEventHandler)
                .build();

        var patientDiedEvent = AmpelPatientDiedEvent.newBuilder()
                .setPatientId("pat-1")
                .build();
        router.routeEvent(patientDiedEvent);

        assertTrue(latch.await(5000, TimeUnit.SECONDS));
        Mockito.verify(defaultEventHandler, Mockito.never()).accept(patientDiedEvent);
    }
}
