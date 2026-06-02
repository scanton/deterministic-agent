import type { TileOption } from '../types'
import './TileGrid.css'

interface Props {
  tiles: TileOption[]
  onSelect: (tile: TileOption) => void
  columns?: 2 | 3
  selectedValue?: string | null
}

export default function TileGrid({ tiles, onSelect, columns = 3, selectedValue }: Props) {
  return (
    <div className={`tile-grid cols-${columns}`}>
      {tiles.map(tile => (
        <button
          key={tile.value}
          className={`tile ${selectedValue === tile.value ? 'tile--selected' : ''}`}
          onClick={() => onSelect(tile)}
        >
          {tile.badge && <span className="tile-badge">{tile.badge}</span>}
          <div className="tile-swatch" style={{ background: tile.gradient }}>
            {tile.emoji && <span className="tile-emoji">{tile.emoji}</span>}
          </div>
          <div className="tile-label">{tile.label}</div>
          {tile.description && <div className="tile-desc">{tile.description}</div>}
        </button>
      ))}
    </div>
  )
}
