"use client"

import { useState, useEffect, useRef } from "react"

// Données fictives pour les articles du panier
const cartItems = [
  { id: 1, name: "Smartphone XYZ", price: 499.99, quantity: 1, image: "/placeholder.svg?height=50&width=50" },
  { id: 2, name: "Écouteurs sans fil", price: 89.99, quantity: 1, image: "/placeholder.svg?height=50&width=50" },
]

export function CartButton() {
  const [itemCount, setItemCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [items, setItems] = useState(cartItems)
  const dropdownRef = useRef(null)

  // Calculer le nombre total d'articles
  useEffect(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0)
    setItemCount(count)
  }, [items])

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Calculer le total du panier
  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center"
        aria-label={`Panier contenant ${itemCount} articles`}
        aria-expanded={isDropdownOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>

        {itemCount > 0 && (
          <span
            className={`absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-blue-600 rounded-full transition-transform ${
              isAnimating ? "scale-125" : "scale-100"
            }`}
          >
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </button>

      {/* Dropdown du panier */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 overflow-hidden">
          <div className="p-3 border-b">
            <h3 className="font-medium">Mon Panier ({itemCount})</h3>
          </div>

          {items.length > 0 ? (
            <>
              <div className="max-h-60 overflow-y-auto p-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md">
                    <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">
                          {item.quantity} x {item.price.toFixed(2)} €
                        </p>
                        <p className="text-sm font-medium">{(item.quantity * item.price).toFixed(2)} €</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">{cartTotal} €</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="/cart"
                    className="py-2 px-3 text-center text-sm border border-gray-300 rounded-md hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    Voir le panier
                  </a>
                  <a
                    href="/checkout"
                    className="py-2 px-3 text-center text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Commander
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 text-center">
              <p className="text-gray-500">Votre panier est vide</p>
              <a href="/products" className="mt-2 inline-block text-sm text-blue-600 hover:underline">
                Commencer vos achats
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

