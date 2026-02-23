import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock next/image since it's hard to test in JSDOM
vi.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img { ...props } fill = { props.fill ? "true" : undefined } />
  },
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
    }),
    useSearchParams: () => ({
        get: vi.fn(),
    }),
    usePathname: () => '',
}))
