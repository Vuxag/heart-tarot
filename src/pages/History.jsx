import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../config/firebase'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'

export default function History() {
  const [readings, setReadings] = useState([])
  const { currentUser } = useAuth()

  useEffect(() => {
    if (!currentUser) return

    const q = query(
      collection(db, 'readings'),
      where('userId', '==', currentUser.uid),
      orderBy('timestamp', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const readingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()
      }))
      setReadings(readingsData)
    })

    return () => unsubscribe()
  }, [currentUser])

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Lịch sử bài đọc</h1>
        
        <div className="space-y-6">
          {readings.map((reading) => (
            <div key={reading.id} className="bg-white/10 p-6 rounded-lg backdrop-blur-lg">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{reading.question}</h2>
                <span className="text-sm text-gray-400">
                  {reading.timestamp?.toLocaleDateString('vi-VN')}
                </span>
              </div>
              
              <div className="space-y-4">
                {reading.cards.map((card) => (
                  <div key={card.id} className="bg-black/20 p-4 rounded-lg">
                    <h3 className="font-medium">{card.name}</h3>
                    <p className="text-gray-300">{card.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 