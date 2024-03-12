FROM python:latest
ENV GDAL_CONFIG=/opt/homebrew/Cellar/gdal/3.8.4_3/bin/gdal-config
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./ /code/
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]