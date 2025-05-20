describe('Sign in and visit competition page', () => {
  it('should lets sportsman sign in and visit swim list in competition', () => {
    // 1. Вход под аккаунтом спортсмена
    cy.visit('/sign-in');
    cy.get('input[name="email"]').type('matvey33.baryshev@mail.ru');
    cy.get('input[name="password"]').type('123123123');
    cy.get('button[name="login-user-button"]').click();

    // Проверяем, что вошли
    cy.url().should('include', '/profile');
    cy.contains('Данные').should('exist');
    cy.contains('Барышев', { timeout: 5000 }).should('be.visible');

    // 2. Переход на страницу календаря
    cy.visit('/calendar');
    cy.url().should('include', '/calendar');

    // 3. Выбор соревнования
    cy.get('div[id="competitionCard-0"]').click();

    // 4. Переход на страницу заплывов
    cy.contains('Заплывы').click();

    // 5. Проверка заплыва
    cy.get('div[id="swimCard-0"]').should("exist");

    // 6. Регистрация
    cy.get('div[id="swimCard-0"]').within(() => {
      cy.get('button[name="swim-register-button"]').then((button) => {
        if (button.find('p:contains("Регистрация")').length > 0) {
          cy.contains('Регистрация').should('exist');
        } else {
          cy.contains('Вы зарегистрированы').should('exist');
        }
      });
    });
  });
});
