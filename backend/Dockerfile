# Use the official Python image
FROM python:latest

# Set the working directory in the container
WORKDIR /code

# Copy the requirements.txt file into the container
COPY ./requirements.txt /code/requirements.txt

# Install the Python dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the rest of the application code into the container
COPY ./ /code/

# Specify the command to run the application
CMD ["uvicorn", "main:app", "--reload"]