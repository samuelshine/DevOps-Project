# Use the official Python image
FROM python:latest

# Set the working directory in the container
WORKDIR /code

# Install the Python dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY ./app /code/app

# Expose the port on which the application will run
EXPOSE 8000

# Specify the command to run the application
CMD ["uvicorn", "main:app", "--reload"]