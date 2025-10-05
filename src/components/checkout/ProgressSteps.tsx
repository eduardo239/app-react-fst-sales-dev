import { cn } from '../../styles/theme';

interface ProgressStepsProps {
  currentStep: 'shipping' | 'payment';
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4">
        <div
          className={cn(
            'flex items-center space-x-2',
            currentStep === 'shipping' ? 'text-blue-600' : 'text-gray-600'
          )}
        >
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center',
              currentStep === 'shipping'
                ? 'bg-blue-600 text-white'
                : currentStep === 'payment'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200'
            )}
          >
            {currentStep === 'payment' ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              '1'
            )}
          </div>
          <span className="font-medium">Shipping</span>
        </div>

        <div className="w-16 h-0.5 bg-gray-200" />

        <div
          className={cn(
            'flex items-center space-x-2',
            currentStep === 'payment' ? 'text-blue-600' : 'text-gray-600'
          )}
        >
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center',
              currentStep === 'payment'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            )}
          >
            2
          </div>
          <span className="font-medium">Payment</span>
        </div>
      </div>
    </div>
  );
}
