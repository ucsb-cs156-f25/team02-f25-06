# Merge Conflict Resolution Guide
## For App.jsx, AppNavbar.jsx, and AppNavbar.test.jsx

## Overview

These three files are shared files that will be modified by multiple team members. When merging PRs, conflicts will occur and need to be resolved manually. This guide provides a step-by-step approach to resolving these conflicts.

---

## General Strategy

**Principle**: Keep ALL changes from both branches. These files are additive - each team member adds their own routes/menu items/tests without removing others.

**DO NOT**: Accept one version entirely (either "ours" or "theirs")
**DO**: Manually combine both versions, keeping all additions

---

## File 1: App.jsx - Route Conflicts

### Conflict Pattern

When merging, you'll see conflicts like:
```jsx
<<<<<<< HEAD (your branch)
import ArticlesIndexPage from "main/pages/Articles/ArticlesIndexPage";
import ArticlesCreatePage from "main/pages/Articles/ArticlesCreatePage";
import ArticlesEditPage from "main/pages/Articles/ArticlesEditPage";
=======
import UCSBDiningCommonsMenuItemIndexPage from "main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemIndexPage";
import UCSBDiningCommonsMenuItemCreatePage from "main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemCreatePage";
import UCSBDiningCommonsMenuItemEditPage from "main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemEditPage";
>>>>>>> origin/main
```

### Resolution Steps

1. **Keep ALL imports** from both branches
   - Your imports (Articles)
   - Main's imports (UCSBDiningCommonsMenuItem, etc.)
   - Order: Keep alphabetical or group by feature

2. **Keep ALL route blocks** from both branches
   - Your routes (Articles)
   - Main's routes (UCSBDiningCommonsMenuItem, etc.)
   - Maintain the same structure pattern

### Example Resolution

**Before (conflict):**
```jsx
<<<<<<< HEAD
import ArticlesIndexPage from "main/pages/Articles/ArticlesIndexPage";
import ArticlesCreatePage from "main/pages/Articles/ArticlesCreatePage";
import ArticlesEditPage from "main/pages/Articles/ArticlesEditPage";
=======
import UCSBDiningCommonsMenuItemIndexPage from "main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemIndexPage";
>>>>>>> origin/main

// ... later in the file ...

<<<<<<< HEAD
      {hasRole(currentUser, "ROLE_USER") && (
        <>
          <Route exact path="/articles" element={<ArticlesIndexPage />} />
        </>
      )}
      {hasRole(currentUser, "ROLE_ADMIN") && (
        <>
          <Route
            exact
            path="/articles/edit/:id"
            element={<ArticlesEditPage />}
          />
          <Route
            exact
            path="/articles/create"
            element={<ArticlesCreatePage />}
          />
        </>
      )}
=======
      {hasRole(currentUser, "ROLE_USER") && (
        <>
          <Route exact path="/ucsbdiningcommonsmenuitem" element={<UCSBDiningCommonsMenuItemIndexPage />} />
        </>
      )}
>>>>>>> origin/main
```

**After (resolved):**
```jsx
import ArticlesIndexPage from "main/pages/Articles/ArticlesIndexPage";
import ArticlesCreatePage from "main/pages/Articles/ArticlesCreatePage";
import ArticlesEditPage from "main/pages/Articles/ArticlesEditPage";
import UCSBDiningCommonsMenuItemIndexPage from "main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemIndexPage";
import UCSBDiningCommonsMenuItemCreatePage from "main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemCreatePage";
import UCSBDiningCommonsMenuItemEditPage from "main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemEditPage";

// ... later in the file ...

      {hasRole(currentUser, "ROLE_USER") && (
        <>
          <Route exact path="/articles" element={<ArticlesIndexPage />} />
          <Route exact path="/ucsbdiningcommonsmenuitem" element={<UCSBDiningCommonsMenuItemIndexPage />} />
        </>
      )}
      {hasRole(currentUser, "ROLE_ADMIN") && (
        <>
          <Route
            exact
            path="/articles/edit/:id"
            element={<ArticlesEditPage />}
          />
          <Route
            exact
            path="/articles/create"
            element={<ArticlesCreatePage />}
          />
          <Route
            exact
            path="/ucsbdiningcommonsmenuitem/edit/:id"
            element={<UCSBDiningCommonsMenuItemEditPage />}
          />
          <Route
            exact
            path="/ucsbdiningcommonsmenuitem/create"
            element={<UCSBDiningCommonsMenuItemCreatePage />}
          />
        </>
      )}
```

---

## File 2: AppNavbar.jsx - Menu Item Conflicts

### Conflict Pattern

When merging, you'll see conflicts like:
```jsx
<<<<<<< HEAD (your branch)
                  <Nav.Link as={Link} to="/articles">
                    Articles
                  </Nav.Link>
=======
                  <Nav.Link as={Link} to="/ucsbdiningcommonsmenuitem">
                    UCSB Dining Commons Menu Item
                  </Nav.Link>
>>>>>>> origin/main
```

### Resolution Steps

1. **Keep ALL Nav.Link items** from both branches
2. **Maintain consistent formatting** (indentation, spacing)
3. **Order alphabetically** or keep the order consistent with App.jsx

### Example Resolution

**Before (conflict):**
```jsx
<<<<<<< HEAD
                  <Nav.Link as={Link} to="/restaurants">
                    Restaurants
                  </Nav.Link>
                  <Nav.Link as={Link} to="/ucsbdates">
                    UCSB Dates
                  </Nav.Link>
                  <Nav.Link as={Link} to="/articles">
                    Articles
                  </Nav.Link>
=======
                  <Nav.Link as={Link} to="/restaurants">
                    Restaurants
                  </Nav.Link>
                  <Nav.Link as={Link} to="/ucsbdates">
                    UCSB Dates
                  </Nav.Link>
                  <Nav.Link as={Link} to="/ucsbdiningcommonsmenuitem">
                    UCSB Dining Commons Menu Item
                  </Nav.Link>
>>>>>>> origin/main
```

**After (resolved):**
```jsx
                  <Nav.Link as={Link} to="/restaurants">
                    Restaurants
                  </Nav.Link>
                  <Nav.Link as={Link} to="/ucsbdates">
                    UCSB Dates
                  </Nav.Link>
                  <Nav.Link as={Link} to="/articles">
                    Articles
                  </Nav.Link>
                  <Nav.Link as={Link} to="/ucsbdiningcommonsmenuitem">
                    UCSB Dining Commons Menu Item
                  </Nav.Link>
```

---

## File 3: AppNavbar.test.jsx - Test Conflicts

### Conflict Pattern

When merging, you'll see conflicts like:
```jsx
<<<<<<< HEAD (your branch)
  test("renders the articles link correctly", async () => {
    // ... test code ...
  });
=======
  test("renders the ucsbdiningcommonsmenuitem link correctly", async () => {
    // ... test code ...
  });
>>>>>>> origin/main
```

### Resolution Steps

1. **Keep ALL test cases** from both branches
2. **Maintain test structure** (describe blocks, test cases)
3. **Keep all test logic** - don't remove any tests

### Example Resolution

**Before (conflict):**
```jsx
  test("renders the restaurants link correctly", async () => {
    // ... test code ...
  });

<<<<<<< HEAD
  test("renders the articles link correctly", async () => {
    const currentUser = currentUserFixtures.userOnly;
    const systemInfo = systemInfoFixtures.showingBoth;
    const doLogin = vi.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AppNavbar
            currentUser={currentUser}
            systemInfo={systemInfo}
            doLogin={doLogin}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await screen.findByText("Articles");
    const link = screen.getByText("Articles");
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe("/articles");
  });
=======
  test("renders the ucsbdiningcommonsmenuitem link correctly", async () => {
    const currentUser = currentUserFixtures.userOnly;
    const systemInfo = systemInfoFixtures.showingBoth;
    const doLogin = vi.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AppNavbar
            currentUser={currentUser}
            systemInfo={systemInfo}
            doLogin={doLogin}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await screen.findByText("UCSB Dining Commons Menu Item");
    const link = screen.getByText("UCSB Dining Commons Menu Item");
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe("/ucsbdiningcommonsmenuitem");
  });
>>>>>>> origin/main
```

**After (resolved):**
```jsx
  test("renders the restaurants link correctly", async () => {
    // ... test code ...
  });

  test("renders the articles link correctly", async () => {
    const currentUser = currentUserFixtures.userOnly;
    const systemInfo = systemInfoFixtures.showingBoth;
    const doLogin = vi.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AppNavbar
            currentUser={currentUser}
            systemInfo={systemInfo}
            doLogin={doLogin}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await screen.findByText("Articles");
    const link = screen.getByText("Articles");
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe("/articles");
  });

  test("renders the ucsbdiningcommonsmenuitem link correctly", async () => {
    const currentUser = currentUserFixtures.userOnly;
    const systemInfo = systemInfoFixtures.showingBoth;
    const doLogin = vi.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AppNavbar
            currentUser={currentUser}
            systemInfo={systemInfo}
            doLogin={doLogin}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await screen.findByText("UCSB Dining Commons Menu Item");
    const link = screen.getByText("UCSB Dining Commons Menu Item");
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe("/ucsbdiningcommonsmenuitem");
  });
```

---

## Step-by-Step Resolution Process

### 1. Identify All Conflicts

```bash
# Check which files have conflicts
git status

# View conflicts in a file
git diff --check
```

### 2. Open Each File with Conflicts

Open the file in your editor and search for conflict markers:
- `<<<<<<< HEAD` - Start of your changes
- `=======` - Separator
- `>>>>>>> origin/main` - End of main's changes

### 3. Resolve Each Conflict

For each conflict:
1. **Identify what's yours** (between `<<<<<<< HEAD` and `=======`)
2. **Identify what's from main** (between `=======` and `>>>>>>> origin/main`)
3. **Keep both** - manually combine them
4. **Remove conflict markers** (`<<<<<<<`, `=======`, `>>>>>>>`)

### 4. Verify Resolution

After resolving all conflicts:
```bash
# Check if all conflicts are resolved
git status

# Should show files as ready to be staged
# If conflicts remain, you'll see "both modified"
```

### 5. Stage Resolved Files

```bash
git add frontend/src/App.jsx
git add frontend/src/main/components/Nav/AppNavbar.jsx
git add frontend/src/tests/components/Nav/AppNavbar.test.jsx
```

### 6. Complete the Merge

```bash
# If you're in the middle of a merge
git commit

# Or if you're rebasing
git rebase --continue
```

### 7. Test Your Resolution

```bash
# Run tests to ensure everything works
cd frontend
npm test -- AppNavbar.test.jsx

# Check linting
npx eslint --fix frontend/src/App.jsx frontend/src/main/components/Nav/AppNavbar.jsx
```

---

## Common Mistakes to Avoid

1. **❌ Accepting one version entirely**
   - Don't use "Accept Current Change" or "Accept Incoming Change"
   - Always manually combine both versions

2. **❌ Removing duplicate code**
   - If both branches have the same code (like imports for Restaurants), keep it
   - Don't remove "duplicates" - they're not duplicates if they're from different branches

3. **❌ Changing the order randomly**
   - Maintain consistent ordering (alphabetical or by feature)
   - Keep related code together

4. **❌ Forgetting to remove conflict markers**
   - Always remove `<<<<<<<`, `=======`, `>>>>>>>`
   - Leaving them will cause syntax errors

5. **❌ Not testing after resolution**
   - Always run tests after resolving conflicts
   - Ensure the app still works

---

## Quick Reference Checklist

When resolving conflicts in these files:

- [ ] **App.jsx**
  - [ ] Keep all imports from both branches
  - [ ] Keep all route blocks from both branches
  - [ ] Maintain consistent structure (ROLE_USER, then ROLE_ADMIN)
  - [ ] Remove all conflict markers

- [ ] **AppNavbar.jsx**
  - [ ] Keep all Nav.Link items from both branches
  - [ ] Maintain consistent formatting
  - [ ] Keep alphabetical order or consistent grouping
  - [ ] Remove all conflict markers

- [ ] **AppNavbar.test.jsx**
  - [ ] Keep all test cases from both branches
  - [ ] Maintain test structure
  - [ ] Don't remove any test logic
  - [ ] Remove all conflict markers

- [ ] **After resolution**
  - [ ] Stage all resolved files (`git add`)
  - [ ] Run tests (`npm test`)
  - [ ] Check linting (`npx eslint --fix`)
  - [ ] Verify the app runs correctly

---

## Example: Complete Merge Scenario

Assume you're merging main into your branch that has Articles routes:

### Step 1: Start the merge
```bash
git merge origin/main
# Conflicts detected in App.jsx, AppNavbar.jsx, AppNavbar.test.jsx
```

### Step 2: Resolve App.jsx
- Keep: Your Articles imports and routes
- Keep: Main's UCSBDiningCommonsMenuItem imports and routes
- Combine: Both sets of imports and routes

### Step 3: Resolve AppNavbar.jsx
- Keep: Your Articles menu item
- Keep: Main's UCSBDiningCommonsMenuItem menu item
- Combine: Both menu items in alphabetical order

### Step 4: Resolve AppNavbar.test.jsx
- Keep: Your Articles test
- Keep: Main's UCSBDiningCommonsMenuItem test
- Combine: Both tests in the describe block

### Step 5: Complete merge
```bash
git add frontend/src/App.jsx
git add frontend/src/main/components/Nav/AppNavbar.jsx
git add frontend/src/tests/components/Nav/AppNavbar.test.jsx
git commit -m "Merge main: resolve conflicts in App.jsx, AppNavbar.jsx, AppNavbar.test.jsx"
```

---

## Need Help?

If you're stuck:
1. Review this guide again
2. Check the example resolutions above
3. Ask your team for assistance
4. Remember: **Keep all changes from both branches**


