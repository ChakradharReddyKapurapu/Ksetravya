import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { Heart } from 'lucide-react';

export const FavoriteButton = ({
  item,
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg'
  showLabel = false,
  variant = 'icon', // 'icon' | 'pill'
}) => {
  const { isSaved, toggleSave } = useFavorites();
  const saved = isSaved(item?.id);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleSave(item);
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-2.5 text-base',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  if (variant === 'pill') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold transition-all cursor-pointer shadow-sm ${
          saved
            ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/50'
            : 'bg-forest-900/80 hover:bg-forest-800 text-cream-200/70 hover:text-white border border-white/10'
        } ${className}`}
        title={saved ? 'Remove from Saved' : 'Save to Favorites'}
      >
        <Heart className={`${iconSizes[size]} ${saved ? 'fill-rose-400 text-rose-400' : ''}`} />
        <span>{saved ? 'Saved' : 'Save'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`rounded-full transition-all cursor-pointer flex items-center justify-center ${sizeClasses[size]} ${
        saved
          ? 'bg-rose-500/25 border border-rose-400 text-rose-300 shadow-md shadow-rose-950/40 scale-105'
          : 'bg-forest-900/70 hover:bg-forest-800 border border-white/10 text-cream-200/60 hover:text-white hover:border-white/20'
      } ${className}`}
      title={saved ? 'Remove from Saved Items' : 'Save to Favorites'}
      aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`${iconSizes[size]} transition-transform active:scale-125 ${
          saved ? 'fill-rose-400 text-rose-400 animate-in zoom-in-50' : ''
        }`}
      />
      {showLabel && (
        <span className="ml-1.5 font-display text-xs">{saved ? 'Saved' : 'Save'}</span>
      )}
    </button>
  );
};
