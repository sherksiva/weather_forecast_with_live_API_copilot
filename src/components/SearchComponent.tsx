import { useState } from 'react';
import { motion } from 'framer-motion';

interface SearchComponentProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  onUseLocation: () => void;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  isLoading,
  onUseLocation,
}) => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      onSearch(search);
      setSearch('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex gap-3 mb-8"
    >
      <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
        <motion.div
          className="flex-1 relative"
          whileFocus={{ scale: 1.02 }}
        >
          <motion.input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a city..."
            className="w-full px-6 py-3 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 focus:border-blue-500 focus:outline-none text-white placeholder-gray-400 transition-all focus:ring-2 focus:ring-blue-500/20"
            disabled={isLoading}
          />
          <motion.div
            animate={{ opacity: isLoading ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {isLoading && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
              />
            )}
          </motion.div>
        </motion.div>

        <motion.button
          type="submit"
          disabled={isLoading || !search.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all shadow-lg"
        >
          Search
        </motion.button>
      </form>

      <motion.button
        onClick={onUseLocation}
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all shadow-lg flex items-center gap-2"
      >
        <motion.span
          animate={{ rotate: isLoading ? 360 : 0 }}
          transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: 'linear' }}
        >
          📍
        </motion.span>
        Location
      </motion.button>
    </motion.div>
  );
};

export default SearchComponent;
