# Use the official Python image
FROM python:latest

# Set the working directory in the container
WORKDIR /app

# Install the Python dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port on which the application will run
EXPOSE 8000

# Specify the command to run the application
CMD ["uvicorn", "fastapi:app", "--host", "0.0.0.0", "--port", "8000"]