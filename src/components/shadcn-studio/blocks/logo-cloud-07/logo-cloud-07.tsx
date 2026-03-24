'use client';

import { Badge } from '@/components/react-ui/badge';
import { Button } from '@/components/react-ui/button';
import { MotionPreset } from '@/components/react-ui/motion-preset';
import { Orbiting } from '@/components/react-ui/orbiting';

type Logos = {
  image: string;
  alt: string;
  size: string;
};

const LogoCloud = ({ logos }: { logos: Logos[] }) => {
  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-12 gap-y-20 max-lg:flex-col sm:gap-16 lg:gap-24">
          <div className="max-w-xl space-y-4">
            <MotionPreset fade slide={{ direction: 'up', offset: 50 }} blur transition={{ duration: 0.5 }}>
              <Badge variant="outline" className="eyebrow text-xs font-semibold">
                Ecossistema Monte Sião
              </Badge>
            </MotionPreset>

            <MotionPreset
              component="h2"
              className="section-title"
              fade
              slide={{ direction: 'up', offset: 50 }}
              blur
              transition={{ duration: 0.5 }}
              delay={0.2}
            >
              Conecte competências estratégicas para sua operação
            </MotionPreset>

            <MotionPreset
              component="p"
              className="muted-copy mb-12 sm:mb-16 lg:mb-24"
              fade
              blur
              slide={{ direction: 'up', offset: 50 }}
              transition={{ duration: 0.5 }}
              delay={0.4}
            >
              Um ecossistema integrado de empresas e soluções preparado para sustentar operações com escala, governança e continuidade.
            </MotionPreset>

            <MotionPreset fade blur slide={{ direction: 'up', offset: 50 }} transition={{ duration: 0.5 }} delay={0.6}>
              <div className="flex items-center justify-between gap-4 overflow-hidden rounded-3xl border border-primary/10 bg-primary/6 px-6 py-4 max-sm:flex-col">
                <p className="text-lg font-medium text-primary">Conheça as empresas que compõem o grupo</p>
                <MotionPreset
                  fade
                  blur
                  slide={{ direction: 'right', offset: 20 }}
                  transition={{ duration: 0.4 }}
                  delay={0.8}
                >
                  <Button className="max-sm:w-full" size="lg">
                    Ver ecossistema
                  </Button>
                </MotionPreset>
              </div>
            </MotionPreset>
          </div>

          <MotionPreset
            className="max-sm:scale-[0.78]"
            fade
            blur
            zoom={{ initialScale: 0.8 }}
            transition={{ duration: 0.8 }}
            delay={0.3}
          >
            <div className="relative flex h-[28rem] w-[28rem] flex-col items-center justify-center">
              <Orbiting radius={190} dashed={true} dashedGap={12}>
                {logos.slice(0, 6).map((logo, index) => (
                  <img key={index} src={logo.image} alt={logo.alt} className={logo.size} />
                ))}
              </Orbiting>
              <Orbiting radius={112} reverse speed={2} dashed={true} dashedGap={12}>
                {logos.slice(6).map((logo, index) => (
                  <img key={index} src={logo.image} alt={logo.alt} className={logo.size} />
                ))}
              </Orbiting>

              <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/10 bg-white shadow-[0_16px_50px_rgba(11,45,57,0.12)]">
                <img src={`${import.meta.env.BASE_URL}images/solutions/logo_monte.svg`} alt="Monte Sião" className="h-12 w-auto" />
              </div>
            </div>
          </MotionPreset>
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
