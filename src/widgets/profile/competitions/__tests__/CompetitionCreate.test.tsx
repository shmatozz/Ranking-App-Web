import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CompetitionsCreate } from '@/widgets/profile/competitions';
import { SwimCreateForm, useSwimCreateStore } from '@/features/competition/create';
import { useCompetitionsCreateStore } from '@/widgets/profile';

jest.mock('@/widgets/profile', () => ({
  useCompetitionsCreateStore: jest.fn(),
  participantsType: [
    { id: "AMATEURS", name: "Любители" },
    { id: "PROFESSIONALS", name: "Професионалы" }
  ]
}));

jest.mock('@/features/competition/create', () => ({
  SwimCreateForm: jest.fn(() => <SwimCreateForm onCancel={jest.fn()} onSubmit={jest.fn()}/>),
  useSwimCreateStore: jest.fn(),
  swimStyles: [{ id: "freestyle", name: "Вольный" }, { id: "breaststroke", name: "Брасс" },]
}));

jest.mock('@/shared/lib', () => ({
  auth: jest.fn(),
  signUp: jest.fn()
}));

describe('CompetitionsCreate', () => {
  const mockOnCancel = jest.fn();
  const mockOnSuccess = jest.fn();

  const mockCompetitionStore = {
    name: '',
    location: '',
    date: '',
    participants: '',
    description: '',
    videoLink: '',
    contacts: ['', '', ''],
    contactFromProfile: false,
    swims: [],
    hasError: false,
    isLoading: false,
    isFormValid: true,
    setName: jest.fn(),
    setLocation: jest.fn(),
    setDate: jest.fn(),
    setParticipants: jest.fn(),
    setDescription: jest.fn(),
    setVideoLink: jest.fn(),
    setContact: jest.fn(),
    setContactFromProfile: jest.fn(),
    setAttachmentFile: jest.fn(),
    addSwim: jest.fn(),
    deleteSwim: jest.fn(),
    createCompetition: jest.fn(),
    clearForm: jest.fn(),
  };

  const mockSwimStore = {
    distance: 0,
    maxParticipants: 0,
    ageFrom: 0,
    ageTo: 0,
    style: '',
    price: 0,
    gender: 'MIXED',
    startTime: '',
    duration: '',
    isFormValid: true,
    setDistance: jest.fn(),
    setMaxParticipants: jest.fn(),
    setAgeFrom: jest.fn(),
    setAgeTo: jest.fn(),
    setStyle: jest.fn(),
    setPrice: jest.fn(),
    setGender: jest.fn(),
    setStartTime: jest.fn(),
    setDuration: jest.fn(),
    clearForm: jest.fn(),
  };

  beforeEach(() => {
    (useCompetitionsCreateStore as unknown as jest.Mock).mockReturnValue(mockCompetitionStore);
    (useSwimCreateStore as unknown as jest.Mock).mockReturnValue(mockSwimStore);
    (SwimCreateForm as jest.Mock).mockImplementation(({ onSubmit }) => (
      <button onClick={onSubmit}>Submit Swim</button>
    ));

    jest.clearAllMocks();
  });

  it('Renders create competition form', () => {
    render(<CompetitionsCreate onCancel={mockOnCancel} onSuccess={mockOnSuccess} />);

    expect(screen.getByText('Создание соревнования')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Название старта')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Место проведения')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Дата')).toBeInTheDocument();
    expect(screen.getByText('Тип участников')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Описание')).toBeInTheDocument();
    expect(screen.getByText('Добавить заплыв')).toBeInTheDocument();
  });

  it('input main information', async () => {
    render(<CompetitionsCreate onCancel={mockOnCancel} onSuccess={mockOnSuccess} />);

    const nameInput = screen.getByPlaceholderText('Название старта');
    await userEvent.type(nameInput, 'Test Competition');
    expect(mockCompetitionStore.setName).toHaveBeenCalledTimes('Test Competition'.length);

    const locationInput = screen.getByPlaceholderText('Место проведения');
    await userEvent.type(locationInput, 'Test Location');
    expect(mockCompetitionStore.setLocation).toHaveBeenCalledTimes('Test Location'.length);

    const dateInput = screen.getByPlaceholderText('Дата');
    fireEvent.change(dateInput, { target: { value: '2023-12-31' } });
    expect(mockCompetitionStore.setDate).toHaveBeenCalledWith('2023-12-31');

    const descriptionInput = screen.getByPlaceholderText('Описание');
    await userEvent.type(descriptionInput, 'Test Description');
    expect(mockCompetitionStore.setDescription).toHaveBeenCalledTimes('Test Description'.length);
  });

  it('open create swim form', async () => {
    render(<CompetitionsCreate onCancel={mockOnCancel} onSuccess={mockOnSuccess} />);

    expect(screen.queryByText('Submit Swim')).not.toBeInTheDocument();

    const addSwimButton = screen.getByText('Добавить заплыв');
    await userEvent.click(addSwimButton);

    expect(screen.getByText('Submit Swim')).toBeInTheDocument();

    expect(screen.queryByText('Добавить заплыв')).not.toBeInTheDocument();
  });

  it('add swim', async () => {
    render(<CompetitionsCreate onCancel={mockOnCancel} onSuccess={mockOnSuccess} />);

    const addSwimButton = screen.getByText('Добавить заплыв');
    await userEvent.click(addSwimButton);

    const submitSwimButton = screen.getByText('Submit Swim');
    await userEvent.click(submitSwimButton);

    expect(mockCompetitionStore.addSwim).toHaveBeenCalled();

    expect(screen.queryByText('Submit Swim')).not.toBeInTheDocument();
  });

  it('shows additional contacts', async () => {
    render(<CompetitionsCreate onCancel={mockOnCancel} onSuccess={mockOnSuccess} />);

    expect(screen.queryByLabelText('Дополнительный контакт')).not.toBeInTheDocument();

    const expandButton = screen.getByTestId('expand');
    await userEvent.click(expandButton);

    expect(screen.getAllByPlaceholderText('Дополнительный контакт')).toHaveLength(2);
  });

  it('submits form on create button press', async () => {
    render(<CompetitionsCreate onCancel={mockOnCancel} onSuccess={mockOnSuccess} />);

    const createButton = screen.getByText('Создать');
    await userEvent.click(createButton);

    expect(mockCompetitionStore.createCompetition).toHaveBeenCalledWith(mockOnSuccess);
  });

  it('cancel create competition on cancel button press', async () => {
    render(<CompetitionsCreate onCancel={mockOnCancel} onSuccess={mockOnSuccess} />);

    const cancelButton = screen.getByText('Отменить создание');
    await userEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('block create button on invalid form', () => {
    (useCompetitionsCreateStore as unknown as jest.Mock).mockReturnValueOnce({
      ...mockCompetitionStore,
      isFormValid: false,
    });

    render(<CompetitionsCreate onCancel={mockOnCancel} onSuccess={mockOnSuccess} />);

    expect(screen.getByText('Создать')).toBeDisabled();
  });

  it('shows error on create error', () => {
    (useCompetitionsCreateStore as unknown as jest.Mock).mockReturnValueOnce({
      ...mockCompetitionStore,
      hasError: true,
    });

    render(<CompetitionsCreate onCancel={mockOnCancel} onSuccess={mockOnSuccess} />);

    expect(screen.getByText(/При созднии соревнования произошла ошибка/i)).toBeInTheDocument();
  });
});
