import { Inter, Lusitana} from 'next/font/google';

//exporting Inter font for use
export const inter = Inter({ subsets: ['latin'] });

//exercise. exporting Lusitana font for use
export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin'],
})
