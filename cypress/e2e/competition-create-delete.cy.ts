describe('Организация создаёт и удаляет соревнование с заплывом', () => {
  const testCompetitionName = 'Тестовое соревнование';
  const today = new Date().toISOString().split('T')[0];

  it('создаёт и удаляет соревнование', () => {
    cy.visit('/sign-in');

    // 1. Вход
    cy.get('input[name="email"]').type('mibaryshev@edu.hse.ru');
    cy.get('input[name="password"]').type('123123123');
    cy.get('button[name="login-user-button"]').click();

    // 2. Переход в профиль
    cy.url().should('include', '/profile');
    cy.contains('Тестовая организация', { timeout: 5000 }).should('be.visible');

    // 3. Мои соревнования
    cy.contains('Мои соревнования').click();
    cy.url().should('include', '/profile?p=comps');

    // 4. Создание соревнования
    cy.contains('Добавить соревнование').click();

    cy.get('input[id="name"]').type(testCompetitionName);
    cy.get('input[id="place"]').type('Место проведения');
    cy.get('input[id="date"]').type(today);
    cy.get('textarea[id="description"]').type('Автотестовое описание соревнования');
    cy.get('input[id="liveVideoLink"]').type('https://example.com/live');
    cy.get('input[id="mainContact"]').type('+7 999 888 77 66');

    // Загрузка PDF-файла (файл должен быть в fixtures)
    cy.get('input[id="file-select"]').selectFile('cypress/fixtures/test.pdf');

    // 5. Добавление заплыва
    cy.contains('Добавить заплыв').click();

    cy.get('input[id="swim-distance"]').type('100');
    cy.get('input[id="swim-max-participants"]').type('8');
    cy.get('input[id="swim-age-from"]').type('12');
    cy.get('input[id="swim-age-to"]').type('16');

    cy.get('input[id="swim-payment-amount"]').type('500');
    cy.contains('Все').click();
    cy.get('input[id="swim-time-start"]').type('10:00');
    cy.get('input[id="swim-duration"]').type('00:30');

    cy.contains('Создать заплыв').click();

    // Убедиться, что заплыв добавлен
    cy.contains('100м').should('exist'); // или другой текст, отображаемый на карточке заплыва

    // 6. Создание соревнования
    cy.contains('Создать').click();

    // Проверка успешного создания
    cy.contains(testCompetitionName, { timeout: 5000 }).should('exist');

    // 7. Переход в календарь и удаление
    cy.visit('/calendar');
    cy.contains(testCompetitionName).click();

    cy.contains('Удалить').click();
    cy.get('button[name="confirm-competition-delete"]').click();

    // Проверка, что соревнование удалено
    cy.contains(testCompetitionName).should('not.exist');
  });
});
