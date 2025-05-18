import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RatingPage } from '@/screens/rating';
import { useRatingsStore } from '@/features/ratings';
import { useSearchParams } from 'next/navigation';

jest.mock('@/features/ratings', () => ({
  useRatingsStore: jest.fn(),
  categories: [
    { id: 'PROFESSIONALS', name: 'Профессионалы' },
    { id: 'AMATEURS', name: 'Любители' },
    { id: 'RESET', name: 'Сбросить' }
  ],
  gender: [
    { id: 'MALE', name: 'Мужской' },
    { id: 'FEMALE', name: 'Женский' },
    { id: 'RESET', name: 'Сбросить' }
  ],
  amateurCategories: [
    { id: 'AMATEUR_1', name: 'Любители 1' },
    { id: 'AMATEUR_2', name: 'Любители 2' }
  ],
  professionalsCategories: [
    { id: 'PRO_1', name: 'Профессионалы 1' },
    { id: 'PRO_2', name: 'Профессионалы 2' }
  ]
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(),
}));


jest.mock('@/shared/lib', () => ({auth: jest.fn() }));

describe('RatingPage', () => {
  const mockGetRatings = jest.fn();
  const mockSetPage = jest.fn();

  const mockRatingStore = {
    rating: [
      {
        id: '1',
        fullName: 'Иванов Иван',
        gender: 'Мужской',
        age: 25,
        rating: 1000,
        starts: 10,
        firstPlaceCount: 5,
        secondPlaceCount: 3,
        thirdPlaceCount: 2,
        bestTime100: '00:01:20',
        image: null
      }
    ],
    filters: {},
    page: 0,
    pageSize: 20,
    totalPages: 1,
    totalResults: 1,
    isLoading: false,
    hasError: false,
    getRatings: mockGetRatings,
    filtersActions: {
      setGender: jest.fn(),
      setUserType: jest.fn(),
      setCategoryEnum: jest.fn(),
      setStartFrom: jest.fn(),
    },
    setPage: mockSetPage,
    clearFilters: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRatingsStore as unknown as jest.Mock).mockReturnValue(mockRatingStore);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  describe('Default State', () => {
    it('renders page header', () => {
      render(<RatingPage />);
      expect(screen.getByText('Рейтинг спортсменов')).toBeInTheDocument();
    });

    it('shows rating filters', () => {
      render(<RatingPage />);
      expect(screen.getByTestId('ratings-header')).toBeInTheDocument();
    });

    it('shows ratings list', () => {
      render(<RatingPage />);
      expect(screen.getByText('Иванов Иван')).toBeInTheDocument();
      expect(screen.getByText('1000')).toBeInTheDocument();
    });

    it('call getRatings on mount', () => {
      render(<RatingPage />);
      expect(mockGetRatings).toHaveBeenCalled();
    });
  });

  describe('Empty State', () => {
    beforeEach(() => {
      (useRatingsStore as unknown as jest.Mock).mockReturnValue({
        ...mockRatingStore,
        rating: [],
        totalPages: 0,
        totalResults: 0,
      });
    });

    it('shows message on empty data', () => {
      render(<RatingPage />);
      const message = screen.getByText(/Информация о рейтинге по данным фильтрам в данный момент недоступна/i);
      expect(message).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    beforeEach(() => {
      (useRatingsStore as unknown as jest.Mock).mockReturnValue({
        ...mockRatingStore,
        isLoading: true,
      });
    });

    it('shows loading indicator', () => {
      render(<RatingPage />);
      expect(screen.getByTestId("ratings-loader")).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    beforeEach(() => {
      (useRatingsStore as unknown as jest.Mock).mockReturnValue({
        ...mockRatingStore,
        hasError: true,
        errorMessage: 'Ошибка загрузки рейтинга',
      });
    });

    it('shows error message', () => {
      render(<RatingPage />);
      expect(screen.getByText(/Ошибка загрузки рейтинга/i)).toBeInTheDocument();
    });
  });

  describe('Filters Interaction', () => {
    const mockFiltersActions = {
      setGender: jest.fn(),
      setUserType: jest.fn(),
      setCategoryEnum: jest.fn(),
      setStartFrom: jest.fn(),
    };

    beforeEach(() => {
      (useRatingsStore as unknown as jest.Mock).mockReturnValue({
        ...mockRatingStore,
        filtersActions: mockFiltersActions,
      });
    });


    it('changes gender filter', async () => {
      render(<RatingPage />);

      const genderDropdown = screen.getByTestId('dropdown-Пол');
      await userEvent.click(genderDropdown);

      const maleOption = screen.getByTestId('dropdown-Пол-Мужской');
      await userEvent.click(maleOption);

      expect(mockFiltersActions.setGender).toHaveBeenCalledWith({ id: 'MALE', name: 'Мужской' });
      expect(mockGetRatings).toHaveBeenCalled();
    });

    it('change filter on starts count', async () => {
      render(<RatingPage />);

      const startsInput = screen.getByPlaceholderText('Кол-во стартов, от');
      await userEvent.type(startsInput, '5');

      expect(mockFiltersActions.setStartFrom).toHaveBeenCalledWith(5);
      expect(mockGetRatings).toHaveBeenCalled();
    });
  });
});
