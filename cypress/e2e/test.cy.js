// Test: Testing the to do items
describe("Testing the to do items", () => {
    let TODO_ITEM_ONE = "Make every second count";
    let TODO_ITEM_TWO = "Invest in yourself";
    let TODO_ITEM_THREE = "Learn Cypress";
  
    // Before each test, visit the to-do list app homepage
    beforeEach(() => {
      cy.visit("http://localhost:8888/#/");
    });
  
    // Test: Displays items
    it("displays items", () => {
      // Type the text of the first to-do item in the input field and press Enter
      cy.get(".new-todo").type(TODO_ITEM_ONE).type("{enter}");
      
      // Type the text of the second to-do item in the input field and press Enter
      cy.get(".new-todo").type(TODO_ITEM_TWO).type("{enter}");
      
      // Type the text of the third to-do item in the input field and press Enter
      cy.get(".new-todo").type(TODO_ITEM_THREE).type("{enter}");
    });
  });
  
  // Context: Mark 'Learn Cypress' as complete
  context("Mark 'Learn Cypress' as complete", function () {
    beforeEach(function () {
      // Before each test in this context, create three default to-do items and alias them as 'todos'
      cy.createDefaultTodos().as("todos");
    });
  
    // Test: Should allow me to mark 'Learn Cypress' as completed
    it("should allow me to mark 'Learn Cypress' as completed", function () {
      // Mark the to-do item with the label "Learn Cypress" as complete using the checkbox
      cy.contains("label", "Learn Cypress")
        .siblings(".toggle")
        .check();
  
      // Verify that the to-do items are rendered correctly and have the expected text
      cy.get(".todo-list li").should("have.length", 3);
      cy.get(".todo-list li").eq(0).should("contain", "Make every second count");
      cy.get(".todo-list li").eq(1).should("contain", "Invest in yourself");
      cy.get(".todo-list li").eq(2).should("contain", "Learn Cypress");
  
      // Verify that the item "Learn Cypress" has been marked as completed by checking its CSS property
      cy.contains("label", "Learn Cypress")
        .should("have.css", "text-decoration-line", "line-through");
    });
  });
  