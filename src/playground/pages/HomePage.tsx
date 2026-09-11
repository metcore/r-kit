import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../components/text';
import { Input } from '../../components/input';
import {
  InputGroup,
  InputGroupControl,
  InputGroupText,
} from '../../components/input-group';
import { Icon } from '../../components/icons';
import { componentCatalog } from '../data/component-catalog';
import illustration from '../../assets/images/overview/component-illustration.png';
import swoosh from '../../assets/images/overview/banner-swoosh.svg';
import circle from '../../assets/images/overview/banner-circle.svg';
import dot from '../../assets/images/overview/banner-dot.svg';

function HomePage() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (keyword === '') return componentCatalog;
    return componentCatalog.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword)
    );
  }, [query]);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-primary-1000 relative overflow-hidden rounded-xl py-12 pr-12 pl-12 lg:pr-[440px]">
        <img
          src={swoosh}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-[200px] w-[570px] max-w-none"
        />
        <img
          src={dot}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-[23px] left-[17px] size-[15px]"
        />
        <img
          src={circle}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[16px] bottom-0 hidden h-[96px] w-[200px] max-w-none lg:block"
        />
        <img
          src={illustration}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[34px] bottom-0 hidden h-[200px] w-[382px] max-w-none object-contain lg:block"
        />

        <div className="relative flex max-w-[980px] flex-col gap-2.5">
          <Text
            as="h1"
            variant="h1"
            weight="bold"
            className="text-white"
            value="Overview"
          />
          <Text
            variant="t1"
            className="text-white"
            value={`Katalog ${componentCatalog.length} komponen r-kit yang siap dipakai. Cari lewat kolom pencarian di bawah, lalu buka salah satu kartu untuk melihat contoh penggunaan, varian, potongan kodenya, serta dokumentasi props-nya.`}
          />
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center">
          <Text
            as="h2"
            variant="p2"
            weight="semibold"
            className="flex-1 text-gray-900"
            value="Overview"
          />
          <InputGroup className="w-full sm:w-[327px]">
            <InputGroupText>
              <Icon name="search" size={20} />
            </InputGroupText>
            <InputGroupControl>
              <Input
                placeholder="Search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </InputGroupControl>
          </InputGroup>
        </div>

        {results.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Text
              variant="t1"
              className="text-gray-700"
              value={`Tidak ada komponen yang cocok dengan "${query}".`}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {results.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="hover:border-primary-500 focus-visible:ring-primary-300 flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <div className="aspect-[258/174] w-full overflow-hidden border-b border-gray-300 object-cover">
                  <img
                    src={item.thumbnail}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    width={517}
                    height={348}
                    className="aspect-[258/174] w-full scale-105 object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1 p-4">
                  <Text
                    variant="t2"
                    weight="semibold"
                    className="text-gray-900"
                    value={item.title}
                  />
                  <Text
                    variant="t2"
                    className="text-gray-700"
                    value={item.description}
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
