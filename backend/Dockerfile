# Use the official Python image
FROM python:latest

# Set the working directory in the container
WORKDIR /code

# Copy the application code into the container
COPY ./ /code

# Install the Python dependencies
RUN pip install -r requirements.txt

# Expose the port on which the application will run
EXPOSE 8000

WORKDIR /code/appli

# Specify the command to run the application
CMD ["uvicorn", "main:app", "--port", "8000", "--host", "127.0.0.1"]