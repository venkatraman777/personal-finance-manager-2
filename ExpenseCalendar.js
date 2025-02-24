import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ExpenseCalendar = ({ expenses }) => {
    const [hoveredDate, setHoveredDate] = useState(null);

    // Group expenses by date
    const expenseMap = expenses.reduce((acc, expense) => {
        const date = new Date(expense.date).toDateString();
        acc[date] = (acc[date] || 0) + expense.amount;
        return acc;
    }, {});
    const [selectedDate, setSelectedDate] = useState(null);

    return (
         <div className="calendar-container" style={{
            background: "rgba(255, 255, 255, 0.9)", // ✅ Semi-transparent white
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // ✅ Soft shadow
            textAlign: "center",
            width: "300px",
            margin: "20px auto",
            position: "relative",
            zIndex: 10, // ✅ Ensures it's above the particles
          }}>
            <div>
        <Calendar
            onClickDay={(date) => setSelectedDate(date.toDateString())}
            tileContent={({ date }) => {
                const dateString = date.toDateString();
                return expenseMap[dateString] ? (
                    <p style={{ fontSize: "12px", color: "red" }}>
                        ₹{expenseMap[dateString]}
                    </p>
                ) : null;
            }}
        />
        
        {/* Show expense details when a date is selected */}
        {selectedDate && (
            <div className="expense-details">
                <h3>Expenses on {selectedDate}:</h3>
                <ul>
                    {expenses
                        .filter((exp) => new Date(exp.date).toDateString() === selectedDate)
                        .map((exp) => (
                            <li key={exp.id}>{exp.category}: ₹{exp.amount}</li>
                        ))}
                </ul>
            </div>
        )}
    </div>
        </div>
    );
};

export default ExpenseCalendar;

/* <div className="calendar-container" style={{
            background: "rgba(255, 255, 255, 0.9)", // ✅ Semi-transparent white
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // ✅ Soft shadow
            textAlign: "center",
            width: "300px",
            margin: "20px auto",
            position: "relative",
            zIndex: 10, // ✅ Ensures it's above the particles
          }}>*/