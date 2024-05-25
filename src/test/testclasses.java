import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.stubbing.OngoingStubbing;
import org.mockito.stubbing.Stubber;
import org.mockito.verification.VerificationMode;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class AnimationTest {

    @Test
    public void testFetchData() throws IOException {
        // Mocking HttpURLConnection
        HttpURLConnection httpURLConnection = mock(HttpURLConnection.class);
        when(httpURLConnection.getInputStream()).thenReturn(mock(InputStream.class));

        // Mocking URL
        URL url = mock(URL.class);
        when(url.openConnection()).thenReturn(httpURLConnection);

        // Mocking Document and Element
        Document document = mock(Document.class);
        Element element = mock(Element.class);
        when(document.getElementById(any())).thenReturn(element);

        // Mocking fetchData method
        Animation animation = new Animation();
        Animation spy = Mockito.spy(animation);
        Mockito.doReturn(url).when(spy).createURL(any());
        Mockito.doReturn(document).when(spy).parseXML(any());

        // Testing fetchData method
        spy.fetchData();
    }

    @Test
    public void testAnimationTimeline() {
        // Implement your test for animationTimeline method
    }
}
