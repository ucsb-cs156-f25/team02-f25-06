package edu.ucsb.cs156.example.web;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import edu.ucsb.cs156.example.WebTestCase;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
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
  @Test
  public void admin_user_can_create_edit_delete_recommendationrequests() throws Exception {
    setupUser(true);

    page.getByText("Recommendation Requests").click();

    page.getByText("Create Recommendation Request").click();
    assertThat(page.getByText("Create New Recommendation Request")).isVisible();
    page.getByLabel("Requester Email").fill("abhiram_agina@ucsb.edu");
    page.getByLabel("Professor Email").fill("ziad.matni@ucsb.edu");
    page.getByLabel("Explanation").fill("This is required for P.H.D. Applications.");
    page.getByLabel("Date Requested (iso format)").fill("2025-11-28T00:00:00");
    page.getByLabel("Date Needed (iso format)").fill("2025-11-29T00:00:00");
    page.getByLabel("Done").check();
    page.getByText("Create").click();

    assertThat(page.getByTestId("RecommendationRequestTable-cell-row-0-col-requesterEmail"))
        .hasText("abhiram_agina@ucsb.edu");
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
