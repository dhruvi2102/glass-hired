import React, { useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Search, X, Check } from 'lucide-react';

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectTypeAheadProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  minChars?: number;
}

export const MultiSelectTypeAhead: React.FC<MultiSelectTypeAheadProps> = ({
  options,
  value = [],
  onChange,
  placeholder = 'Search and select...',
  label,
  error,
  disabled,
  className,
  minChars = 0,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOptions = options.filter(opt => value.includes(opt.value));

  const filteredOptions = useMemo(() => {
    if (inputValue.length < minChars) return options;
    return options.filter(opt =>
      opt.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [options, inputValue, minChars]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleToggle = (option: MultiSelectOption) => {
    const isSelected = value.includes(option.value);
    if (isSelected) {
      onChange?.(value.filter(v => v !== option.value));
    } else {
      onChange?.([...value, option.value]);
    }
  };

  const handleRemove = (optionValue: string) => {
    onChange?.(value.filter(v => v !== optionValue));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleToggle(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'Backspace':
        if (!inputValue && value.length > 0) {
          handleRemove(value[value.length - 1]);
        }
        break;
    }
  };

  return (
    <div className={cn("space-y-2", className)} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        <div className={cn(
          "min-h-[42px] px-3 py-2 rounded-lg",
          "bg-background/50 backdrop-blur-sm",
          "border border-border/50",
          "flex flex-wrap items-center gap-2",
          "focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary",
          "transition-all duration-200",
          disabled && "opacity-50 cursor-not-allowed",
          error && "border-destructive"
        )}>
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-md",
                "bg-primary/20 text-primary text-sm"
              )}
            >
              {option.label}
              <button
                type="button"
                onClick={() => handleRemove(option.value)}
                className="hover:text-primary/70"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <div className="flex-1 min-w-[120px] flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={selectedOptions.length === 0 ? placeholder : ''}
              disabled={disabled}
              className={cn(
                "flex-1 bg-transparent border-none outline-none",
                "text-foreground placeholder:text-muted-foreground",
                "text-sm"
              )}
            />
          </div>
        </div>

        {isOpen && filteredOptions.length > 0 && (
          <div className={cn(
            "absolute z-50 w-full mt-1 rounded-lg",
            "bg-popover backdrop-blur-xl",
            "border border-border/50",
            "shadow-lg shadow-black/20",
            "max-h-60 overflow-auto"
          )}>
            {filteredOptions.map((option, index) => {
              const isSelected = value.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleToggle(option)}
                  className={cn(
                    "w-full px-4 py-2.5 text-left",
                    "flex items-center justify-between",
                    "hover:bg-accent/50 transition-colors",
                    "text-foreground",
                    highlightedIndex === index && "bg-accent/50",
                    isSelected && "bg-accent/30"
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};
