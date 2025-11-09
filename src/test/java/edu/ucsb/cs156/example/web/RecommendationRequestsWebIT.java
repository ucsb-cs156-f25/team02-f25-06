package edu.ucsb.cs156.example.web;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import edu.ucsb.cs156.example.WebTestCase;
import edu.ucsb.cs156.example.entities.RecommendationRequest;
import edu.ucsb.cs156.example.repositories.RecommendationRequestRepository;
import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("integration")
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class RecommendationRequestsWebIT extends WebTestCase {
  @Autowired RecommendationRequestRepository recommendationRequestRepository;

  @Test
  public void admin_user_can_create_edit_delete_recommendationrequests() throws Exception {

    LocalDateTime ldt1 = LocalDateTime.parse("2025-10-28T00:00:00");
    LocalDateTime ldt2 = LocalDateTime.parse("2025-10-29T00:00:00");

    RecommendationRequest recommendationRequest1 =
        RecommendationRequest.builder()
            .requesterEmail("abhiram_agina@ucsb.edu")
            .professorEmail("ziad.matni@ucsb.edu")
            .explanation("This is required for M.S. Applications.")
            .dateRequested(ldt1)
            .dateNeeded(ldt2)
            .done(false)
            .build();

    recommendationRequestRepository.save(recommendationRequest1);

    setupUser(true);
    page.getByText("Recommendation Requests").click();

    assertThat(page.getByTestId("RecommendationRequestTable-cell-row-1-col-requesterEmail"))
        .hasText("abhiram_agina@ucsb.edu");

    page.getByTestId("RecommendationRequestTable-cell-row-1-col-Delete-button").click();
    assertThat(page.getByTestId("RecommendationRequestTable-cell-row-1-col-requesterEmail"))
        .not()
        .isVisible();
    /*
        page.getByTestId("RecommendationRequestTable-cell-row-0-col-requesterEmail").click();
        assertThat(page.getByText("Edit Restaurant")).isVisible();
        page.getByTestId("RestaurantForm-description").fill("THE BEST");
        page.getByTestId("RestaurantForm-submit").click();

        assertThat(page.getByTestId("RestaurantTable-cell-row-0-col-description")).hasText("THE BEST");

        page.getByTestId("RestaurantTable-cell-row-0-col-Delete-button").click();

        assertThat(page.getByTestId("RestaurantTable-cell-row-0-col-name")).not().isVisible();
    */
  }
  /*
    @Test
    public void regular_user_cannot_create_restaurant() throws Exception {
      setupUser(false);

      page.getByText("Restaurants").click();

      assertThat(page.getByText("Create Restaurant")).not().isVisible();
      assertThat(page.getByTestId("RestaurantTable-cell-row-0-col-name")).not().isVisible();
    }
  */
}
