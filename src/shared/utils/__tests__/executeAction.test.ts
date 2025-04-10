import { executeAction } from '@/shared/utils/executeAction';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

jest.mock('next/dist/client/components/redirect-error', () => ({
  isRedirectError: jest.fn(),
}));

const mockedIsRedirectError = isRedirectError as jest.MockedFunction<typeof isRedirectError>;

describe('executeAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return success when action succeeds', async () => {
    const mockAction = jest.fn().mockResolvedValue('success');
    const result = await executeAction({
      actionFn: mockAction,
      successMessage: 'Custom success',
    });

    expect(result).toEqual({
      success: true,
      message: 'Custom success',
    });
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('should return failure for regular errors', async () => {
    const error = new Error('Regular error');
    const mockAction = jest.fn().mockRejectedValue(error);
    mockedIsRedirectError.mockReturnValue(false);

    const result = await executeAction({
      actionFn: mockAction,
    });

    expect(result).toEqual({
      success: false,
      message: 'An error has occurred during executing the action',
    });
    expect(mockedIsRedirectError).toHaveBeenCalledWith(error);
  });

  it('should rethrow redirect errors', async () => {
    const redirectError = new Error('Redirect error');
    const mockAction = jest.fn().mockRejectedValue(redirectError);
    mockedIsRedirectError.mockReturnValue(true);

    await expect(
      executeAction({
        actionFn: mockAction,
      })
    ).rejects.toThrow('Redirect error');

    expect(mockedIsRedirectError).toHaveBeenCalledWith(redirectError);
  });

  it('should handle non-Error rejections', async () => {
    const mockAction = jest.fn().mockRejectedValue('string error');
    mockedIsRedirectError.mockReturnValue(false);

    const result = await executeAction({
      actionFn: mockAction,
    });

    expect(result).toEqual({
      success: false,
      message: 'An error has occurred during executing the action',
    });
  });

  it('should work with generic return type', async () => {
    const mockAction = jest.fn().mockResolvedValue({ data: 123 });
    const result = await executeAction<{ data: number }>({
      actionFn: mockAction,
    });

    expect(result.success).toBe(true);
  });
});
