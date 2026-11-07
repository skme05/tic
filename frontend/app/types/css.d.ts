/* Variables CSS personnalisées dans l'attribut style : style={{ '--c': '#175F9E' }} */
import 'react';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
