from __future__ import annotations
from typing import List, Optional, Dict
from pydantic import BaseModel, Field

class Author(BaseModel):
    full_name: str
    degrees: List[str] = Field(default_factory=list)
    affiliations: List[int] = Field(default_factory=list)
    is_group: bool = False

class Affiliation(BaseModel):
    index: int
    name: str

class Session(BaseModel):
    type: Optional[str]
    date: Optional[str] = None
    time: Optional[str] = None
    room: Optional[str] = None

class Entities(BaseModel):
    diseases: List[Dict] = Field(default_factory=list)
    drugs: List[Dict] = Field(default_factory=list)
    study_types: List[str] = Field(default_factory=list)

class AbstractRecord(BaseModel):
    identifiers: Dict
    title: Optional[str]
    authors: List[Author] = Field(default_factory=list)
    affiliations: List[Affiliation] = Field(default_factory=list)
    primary_author_institution: Optional[str]
    session: Session
    sections: Dict = Field(default_factory=dict)
    full_text: str
    conflicts: Dict
    references: Dict
    tags_congress: List[str] = Field(default_factory=list)
    tags_auto: List[str] = Field(default_factory=list)
    entities: Entities = Field(default_factory=Entities)
    pages: Dict
    source: Dict
    parse_confidence: float
    parse_warnings: List[str] = Field(default_factory=list)
